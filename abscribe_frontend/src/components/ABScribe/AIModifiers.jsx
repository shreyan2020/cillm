import React, { useRef, useState, useEffect, useContext } from "react";
import EasyEdit from "react-easy-edit";
import CloseButton from "react-bootstrap/CloseButton";
import Collapse from "react-bootstrap/Collapse";
import TextareaAutosize from "react-textarea-autosize";
import { recipeService } from "../../services/recipeService";
import { Button, Card, Badge, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';


import {
  faMagicWandSparkles,
  faTrashAlt,
  faPencil,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import useLLM from "usellm";
import "../../scss/aimodifiers.scss";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useParams } from "react-router-dom";
import { apiClient } from "../../services/abscribeAPI";
import { TaskContext } from '../../context/TaskContext';


export default function AIModifiers({
  selectVersions,
  activeVersionIds,
  activeChunkid,
  updateActiveVersionId,
  getVersionTextFromIds,
  createVersion,
  deleteChunk,
  makeid,
  llmResult,
  setLlmResult,
  llmPrompt,
  setLlmPrompt,
  llmRecipes,
  setLlmRecipes,
  activeLlmRecipe,
  setActiveLlmRecipe,
  llmStreaming,
  setLlmStreaming,
  generateVersion,
  currentDocument,
  stepsEnabled
}) {

  let { documentId: currentDocumentId } = useParams();
  // const [stepsEnabled, setStepsEnabled] = useState(false);


  const backendUrl = import.meta.env.VITE_BACKEND_URL + "chatGPT/chat";

  const aiInputRef = useRef(null);
  const recipesEndRef = useRef(null);

  const [allowRecipeEdit, setAllowRecipeEdit] = useState(false);
  const [showRecipes, setShowRecipes] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { logButtonClick, logGeneratedContent } = useContext(TaskContext);
  const steps = [
    {
      element: '.intro-step1',
      intro: 'Click this button to generate the first version.',
      position: 'right'
    },
    {
      element: '.intro-step2',
      intro: 'Click this button to generate the second version.',
      position: 'right'
    },
    {
      element: '.intro-step3',
      intro: 'Click this button to generate the third version.',
      position: 'right'
    },
    {
      element: '.intro-step4',
      intro: 'Click this button to generate the fourth version.',
      position: 'right'
    },
    {
      element: '.intro-step5',
      intro: 'Click this button to generate the fifth version.',
      position: 'right'
    },
    {
      element: '.intro-step6',
      intro: 'Click this button to generate the sixth version.',
      position: 'right'
    }
  ];
  // useEffect(() => {
  //   console.log('Current Document:', currentDocument);
  //   if (currentDocument?.task_id === "sandbox") {
  //     setStepsEnabled(true);
  //   } else {
  //     setStepsEnabled(false);
  //   }
  //   console.log('setsds', stepsEnabled)
  // }, [currentDocument]);
  
  const defaultHomeDocumentId = '664fbacdb138bf10f0025813';
  useEffect(() => {
    const filterRecipes = () => {
      const filtered = llmRecipes.filter(recipe => {
        // console.log(recipe)
        const homeDocumentIdObj = recipe.home_document_id;
        // console.log('hello', recipe.home_document_id ,currentDocument._id, currentDocumentId )
        return homeDocumentIdObj === defaultHomeDocumentId || homeDocumentIdObj === currentDocument._id;
      });
      setFilteredRecipes(filtered);
    };

    filterRecipes();
  }, [llmRecipes, currentDocumentId]);



  useEffect(() => {
    if (!allowRecipeEdit) {
      scrollToBottom();
    }
  }, [llmRecipes]);

// console.log('asdsds',stepsEnabled)

  const scrollToBottom = () => {
    recipesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createRecipe = (name, prompt) => {
    const recipeId = "recipe_" + makeid(5);
    let recipeObject = { frontend_id: recipeId, name: name, prompt: prompt, home_document_id: currentDocumentId };
    setLlmRecipes((prevState) => {
      return [...prevState, recipeObject];
    });
    recipeService.createRecipe(recipeId, name, prompt, currentDocumentId); // actually put this stuff in the back-end.

    return recipeObject;
  };

  const editRecipe = (recipeId, name, prompt) => {
    const editedRecipes = llmRecipes.map((recipe) => {
      if (recipe.frontend_id === recipeId) {
        recipeService.updateRecipe(recipeId, name, prompt);
        return { frontend_id: recipeId, name: name, prompt: prompt };
      } else {
        return recipe;
      }
    });
    setLlmRecipes(editedRecipes);
    return editedRecipes;
  };

  const deleteRecipe = (recipeId) => {
    setLlmRecipes((prevState) =>
      prevState.filter((recipe) => recipe.frontend_id !== recipeId)
    );
    recipeService.deleteRecipe(recipeId);
  };

  const updateRecipe = (recipeId, name, prompt) => {
    let recipeObject = { frontend_id: recipeId, name: name, prompt: prompt };
    let recipeIndex = getRecipeIndexFromId(recipeId);
    if (recipeIndex == -1) {
      console.log("Failed to update recipe due to invalid index");
      return;
    }
    let recipes = [...llmRecipes];
    let recipe = { ...recipes[recipeIndex] };
    if (name) {
      recipe.name = name;
    }
    if (prompt) {
      recipe.prompt = prompt;
    }
    recipes[recipeIndex] = recipe;
    recipeService.updateRecipe(recipeId, name, prompt);
    setLlmRecipes(recipes);
  };

  const getRecipeIndexFromId = (recipeId) => {
    const recipeIndex = llmRecipes.findIndex(
      (recipe) => recipe.frontend_id === recipeId
    );
    return recipeIndex;
  };

  const getRecipe = (recipeId) => {
    const recipeIndex = getRecipeIndexFromId(recipeId);
    if (recipeIndex !== -1) {
      return llmRecipes[recipeIndex];
    } else {
      return recipeService.getRecipe(recipeId);
    }
  };

  const saveRecipeNameChange = (newName, recipe) => {
    editRecipe(recipe.frontend_id, newName, recipe.prompt);
  };

  const cancelRecipeNameChange = () => {};

  const saveRecipePromptChange = (newPrompt, recipe) => {
    editRecipe(recipe.frontend_id, recipe.name, newPrompt);
  };

  const cancelRecipePromptChange = () => {};

  function removeQuotations(text) {
    if (text.length < 3) {
      return text;
    } else {
      let i = 0;
      let j = text.length;
      if (text[i] == '"' && text[i] == "'") {
        i += 1;
      }
      if (text[j - 1] == '"' && text[j - 1] == "'") {
        j -= 1;
      }
      return text.slice(i, j);
    }
  }

  async function getRecipeNameFromPrompt(prompt) {
    let keyword = "";

    try {
      const response = await apiClient.post("chatGPT/chat", {
        prompt: `Summarize the text in the angle brackets in 1 to 3 words. Make sure this summary best captures the meaning and essence of the text delimited by the angle brackets, so the output can easily be linked to the original text.
                      Try to keep the output to as few words as possible, but prioritize the clarity of the output over everything else.
                      However, if a verb is included in your output, try to keep the output at only 1 word.
                      Some examples of ideal summaries are delimited by the triple hashtags:
                      ###
                      Angle bracket text: 'Translate into French'
                      Output: 'French Translation'
    
                      Angle bracket text: 'Make more formal'
                      Output: 'Formalize'
    
                      Angle bracket text: 'Add % to the start and end of the text'
                      Output: 'Percent Delimination'
                      ###
                      DO NOT OUTPUT MORE THAN 3 WORDS AND DO NOT REOUTPUT ANYTHING THAT IS NOT IN THE ANGLE BRACEKTS!
                      DO NOT INCLUDE ANY QUOTATION MARKS IN YOUR OUTPUT AT ALL!
                      Make sure the output is capitalized and contains no punctuation marks.
                      Before outputting, check to make sure nothing before this line of text is outputted!
                      <${prompt}>
                      `,
        stream: false,
      });

      keyword = response.data.response;
      console.log('Keyword found:', keyword);
    } catch (error) {
      console.error("Something went wrong!", error);
    }

    const result = removeQuotations(keyword);
    return result;
  }

  const loadRecipe = (recipeId) => {
    let recipe = getRecipe(recipeId);
    if (recipe) {
      aiInputRef.current.focus();
      setLlmPrompt(recipe.prompt);
    }
  };

  const onChange = (event) => {
    let prompt = event.target.value;
    setLlmPrompt(prompt);
    if (activeLlmRecipe) {
      updateRecipe(activeLlmRecipe, "", prompt);
    }
  };

  async function handleClick() {
    if (!activeVersionIds[activeChunkid]) {
      updateActiveVersionId(activeChunkid);
    }

    if (!activeLlmRecipe) {
      getRecipeNameFromPrompt(llmPrompt).then((name) => {
        const recipeId = createRecipe(name, llmPrompt).frontend_id;
        logButtonClick(`Recipe Created: ${recipeId}`);
      });
    }
    logButtonClick(`${llmPrompt}`);
    generateVersion(activeChunkid, llmPrompt, "newly created recipe");
    setLlmStreaming(false);
    setLlmPrompt("");
    setActiveLlmRecipe("");
    setShowRecipes(true);
  }

  const handleRecipeButtonClick = (recipeId, prompt, name) => {
    // Update the clicked recipes state
    logClickedRecipe(recipeId);  // Use the context method to log the click
    generateVersion(activeChunkid, prompt, name);
  };

  const handleAddLLMVersionClick = () => {
    const versionId = createVersion(activeChunkid, llmResult);
    console.log(activeChunkid);
    console.log(versionId);
    setActiveVersionIds((prevActiveVersionIds) => ({
      ...prevActiveVersionIds,
      [activeChunkid]: versionId,
    }));
    setLlmResult("");
  };

  return activeChunkid && activeVersionIds[activeChunkid] ? (
    <Card className="border-0">
      {stepsEnabled && (
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={0}
          onExit={() => setStepsEnabled(false)}
        />
      )}
      <div className="d-grid gap-2 px-3 pt-3">
        {selectVersions ? (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setTabKey((prevState) => "test");
                console.log("I was clicked");
              }}
            >
              Create A/B Test <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </>
        ) : (
          ""
        )}
      </div>

      <Card.Footer className="p-2">
        {filteredRecipes.length > 0 ? (
          <>
            <div className="text-center text-muted divider">
              <small>
                <Button
                  onClick={() => setShowRecipes(!showRecipes)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  variant="light"
                  size="sm"
                >
                  LLM Recipes
                </Button>
              </small>
            </div>

            <Collapse in={showRecipes}>
              <div>
                {allowRecipeEdit ? (
                  <>
                    <Card className="mb-2">
                      <ListGroup
                        variant="flush"
                        style={{ maxHeight: "250px", overflow: "auto" }}
                      >
                        {filteredRecipes.map((recipe, index) => (
                          <ListGroup.Item key={index}>
                            <div className="me-3">
                              <div className="fw-bold">
                                <EasyEdit
                                  allowEdit={allowRecipeEdit}
                                  type="text"
                                  onSave={(newName) => {
                                    if (newName !== "") {
                                      saveRecipeNameChange(newName, recipe);
                                    }
                                  }}
                                  onCancel={cancelRecipeNameChange}
                                  saveButtonLabel="Save"
                                  cancelButtonLabel="Cancel"
                                  value={recipe.name}
                                  placeholder={"recipe name"}
                                  buttonsPosition={"after"}
                                  saveButtonStyle={
                                    "btn btn-light btn-sm btn-block"
                                  }
                                  cancelButtonStyle={
                                    "btn btn-light btn-sm btn-block m-1"
                                  }
                                />
                              </div>
                              {allowRecipeEdit ? (
                                <EasyEdit
                                  allowEdit={allowRecipeEdit}
                                  type="textarea"
                                  onSave={(newPrompt) => {
                                    saveRecipePromptChange(newPrompt, recipe);
                                  }}
                                  onCancel={cancelRecipePromptChange}
                                  saveButtonLabel="Save"
                                  cancelButtonLabel="Cancel"
                                  value={recipe.prompt}
                                  buttonsPosition={"after"}
                                  placeholder={"recipe prompt"}
                                  saveButtonStyle={
                                    "btn btn-light btn-sm btn-block"
                                  }
                                  cancelButtonStyle={
                                    "btn btn-light btn-sm m-1  btn-block"
                                  }
                                />
                              ) : (
                                ""
                              )}
                            </div>
                            <small>
                              {allowRecipeEdit ? (
                                <Button
                                  style={{
                                    position: "absolute",
                                    top: "9px",
                                    right: "10px",
                                  }}
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    deleteRecipe(recipe.frontend_id);
                                    if (activeLlmRecipe === recipe.frontend_id) {
                                      setActiveLlmRecipe("");
                                      setLlmPrompt("");
                                    }
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                              ) : (
                                ""
                              )}
                            </small>
                          </ListGroup.Item>
                        ))}
                        <div ref={recipesEndRef} />
                      </ListGroup>
                    </Card>
                  </>
                ) : (
                  <>
                    {filteredRecipes.map((recipe, index) => (
                      <Button
                        className={`text-truncate me-1 mb-1 intro-step${index + 1}`}
                        key={index}
                        size="sm"
                        variant="outline-dark"
                        onClick={() => {
                          generateVersion(activeChunkid, recipe.prompt, recipe.name);
                          logButtonClick(`${recipe.frontend_id}`);
                          // handleRecipeButtonClick(recipe.frontend_id, recipe.prompt, recipe.name)
                        }}
                      >
                        {recipe.name}
                      </Button>
                    ))}
                  </>
                )}
                {/* {allowRecipeEdit ? (
                  <>
                    <div className="text-center">
                      <Button
                        variant="light"
                        className="mb-1"
                        size="sm"
                        onClick={() => {
                          setAllowRecipeEdit((prevState) => !prevState);
                        }}
                      >
                        {allowRecipeEdit ? (
                          <>
                            Done Editing <FontAwesomeIcon icon={faCheck} />
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faPencil} />
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant="light"
                      className="mb-1"
                      size="sm"
                      onClick={() => {
                        setAllowRecipeEdit((prevState) => !prevState);
                      }}
                    >
                      {allowRecipeEdit ? (
                        <>
                          Done Editing <FontAwesomeIcon icon={faCheck} />
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPencil} />
                        </>
                      )}
                    </Button>
                  </>
                )} */}
              </div>
            </Collapse>
          </>
        ) : (
          ""
        )}

        <div className="d-flex align-items-stretch">
          <TextareaAutosize
            ref={aiInputRef}
            maxRows={5}
            className="ml-1 p-2 rounded"
            placeholder="Create LLM Recipe"
            style={{ resize: "none", width: "100%" }}
            disabled={llmStreaming}
            onChange={onChange}
            value={llmPrompt}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleClick();
              }
            }}
          />
          <Button
            className="rounded ms-1"
            variant="outline-secondary"
            onClick={() => {
              handleClick();
            }}
            disabled={llmStreaming}
          >
            <FontAwesomeIcon icon={faMagicWandSparkles} />
          </Button>
        </div>
        
      </Card.Footer>
    </Card>
  ) : (
    ""
  );
}
