import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import useLLM from "usellm";
import { TaskContext } from "../../context/TaskContext";
import { apiClient } from "../../services/abscribeAPI";
import "../../scss/editor.scss";
import {
  getChunks,
  addChunk,
  addChunks,
  getChunk,
  removeChunk,
} from "../../services/chunkService";
import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../../services/documentService";
import {
  addVersion,
  updateVersion,
  removeVersion,
} from "../../services/versionService";

export default function Editor({
  createNewBlankDocument,
  currentDocument,
  setCurrentDocument,
  documentContentUpdateTimer,
  setDocumentContentUpdateTimer,
  activeFactorId,
  setActiveFactorId,
  activeChunkid,
  setActiveChunkid,
  activeVersionIds,
  setActiveVersionIds,
  getChunksFromFactorId,
  chunksVisibleInDocument,
  setChunksVisbleInDocument,
  PopupToolbarVisible,
  setPopupToolbarVisible,
  updateChunk,
  updatePopupToolbarLocation,
  PopupToolbarTop,
  PopupToolbarLeft,
  setPopupToolbarTop,
  setPopupToolbarLeft,
  variationSidebarVisible,
  setVariationSidebarVisible,
  createChunk,
  deleteChunk,
  createVersion,
  getChunkIndexFromId,
  editingMode,
  setEditingMode,
  getChunkFromId,
  updateActiveVersionIds,
  updateActiveVersionId,
  documentName,
  getVisibleChunkIds,
  llmPrompts,
  setLlmPrompts,
  recipePrompt,
  setRecipePrompt,
  recipeStreaming,
  setRecipeStreaming,
  recipeResult,
  setRecipeResult,
  recipes,
  setRecipes,
  activeRecipe,
  setActiveRecipe,
  generateVersion,
}) {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
  const editorRef = useRef(null);
  const { taskID, prolificID, addCompletedTask } = useContext(TaskContext);

  const [gptActive, setGptActive] = useState(false);
  const [llmButtonsTop, setLlmButtonsTop] = useState("");
  const [llmButtonsLeft, setLlmButtonsLeft] = useState("");
  const [llmStopButtonVisible, setLlmStopButtonVisible] = useState(false);

  const [value, setValue] = useState(currentDocument?.content ?? "");

  const keylogRef = useRef([]);
  const clickLogRef = useRef([]);

  useEffect(() => {
    if (activeChunkid === "") {
      setEditingMode(false);
    } else {
      setPopupToolbarVisible(true);
      setEditingMode(true);
    }
  }, [activeChunkid]);

  const handleKeydown = (e) => {
    const newLogEntry = { key: e.key, timestamp: new Date() };
    keylogRef.current = [...keylogRef.current, newLogEntry];
    console.log('Updated keylogRef:', keylogRef.current);
  };

  const handleClick = (e) => {
    const newClickEntry = { element: e.target.tagName, id: e.target.id, className: e.target.className, timestamp: new Date() };
    clickLogRef.current = [...clickLogRef.current, newClickEntry];
    console.log('Updated clickLogRef:', clickLogRef.current);
  };

  const handleSaveButtonClick = async (documentID) => {
    console.log('task id', taskID, 'prolific id', prolificID);
    const activityData = {
      document_id: documentID, 
      task_id: taskID,
      prolific_id: prolificID,
      key_log: keylogRef.current,
      click_log: clickLogRef.current
    };
    console.log("Activity Data:", activityData);
    try {
      await apiClient.post("/log_activity", activityData);
      console.log("Activity logged successfully");
      addCompletedTask(taskID);
      navigate(`/questionnaire`);
    } catch (error) {
      console.error("Failed to log activity:", error);
    }
  };

  const handleEditorClick = () => {
    const node = editorRef.current.editor.selection.getNode();
    const chunk = editorRef.current.editor.dom.getParent(node, "span.chunk");
    const chunkClass = editorRef.current.editor.dom.getAttrib(chunk, "class");
    const factorId = chunkClass.match(/factor_.....*/);
    console.log("Factor ID: " + factorId);
    if (factorId) {
      setActiveFactorId(factorId[0]);
      console.log("Factor Id Updated to " + factorId);
    }
    if (chunk) {
      const chunkid = editorRef.current.editor.dom.getAttrib(chunk, "id");
      console.log(`Chunk Found: ${chunkid}`);
      const chunkFromDocument = currentDocument.chunks.find(
        (chunk) => chunk.frontend_id === chunkid
      );
      if (chunkFromDocument) {
        console.log(`Chunk From Document Found: ${chunkid}`);
        setActiveChunkid(chunkid);
        if (!activeVersionIds[chunkid]) {
          console.log("Active Version Ids Updated");
          updateActiveVersionId(chunkid);
        }
        setEditingMode(true);
      }
    } else {
      setActiveChunkid("");
      let selection = editorRef.current.editor.selection;
      let range = selection.getRng(0);
      const length = Math.abs(range.endOffset - range.startOffset);
      if (length === 0) {
        setPopupToolbarVisible(false);
      }
    }
  };

  const handleEditorMouseUp = () => {
    updatePopupToolbarLocation();
    let selection = editorRef.current.editor.selection;
    let range = selection.getRng(0);
    const length = Math.abs(range.endOffset - range.startOffset);
    if (length > 0 || activeChunkid !== "") {
      setPopupToolbarVisible(true);
    } else {
      setPopupToolbarVisible(false);
    }
  };

  const handleEditorOnChange = () => {
    if (editingMode) {
      const chunk = currentDocument.chunks.find(
        (chunk) => chunk.frontend_id === activeChunkid
      );
      const activeVersion = chunk.versions.find(
        (version) => version.frontend_id === activeVersionIds[activeChunkid]
      );
      const current_version =
        editorRef.current.editor.dom.get(activeChunkid).innerHTML;
      setCurrentDocument((prevDocument) => {
        const updatedChunks = prevDocument.chunks.map((chunk) => {
          if (chunk.frontend_id === activeChunkid) {
            const updatedVersions = chunk.versions.map((version) => {
              if (version.frontend_id === activeVersion?.frontend_id) {
                return { ...version, text: current_version };
              }
              return version;
            });
            return { ...chunk, versions: updatedVersions };
          }
          return chunk;
        });
        return {
          ...prevDocument,
          chunks: updatedChunks,
        };
      });
    }
    const newContent = editorRef.current.editor.getContent();
    clearTimeout(documentContentUpdateTimer);
    const newTimer = setTimeout(() => {
      updateDocument(currentDocument._id, newContent)
        .then(() => console.log("Document updated in backend in Editor"))
        .catch((error) =>
          console.error("Failed to update document in backend:", error)
        );
    }, 500);
    setChunksVisbleInDocument(getVisibleChunkIds());
    setDocumentContentUpdateTimer(newTimer);
  };

  const editorEventCallback = (eventApi) => {
    if (editorRef.current && editorRef.current.props) {
      buttonApi.setEnabled(
        eventApi.element.classList.contains("chunk") &&
        editorRef.current.props.recipes.length > 0
      );
    }
  };

  return (
    <Container fluid className="p-0">
      <Row>
        <Col md={12} className="full-height">
          {currentDocument ? (
            <>
              {/* <div className="llm-buttons">
                <ButtonGroup
                  size="sm"
                  style={{
                    visibility: llmStopButtonVisible ? "visible" : "hidden",
                    top: llmButtonsTop,
                    left: llmButtonsLeft,
                  }}
                ></ButtonGroup>
              </div> */}

              <TinyEditor
                ref={editorRef}
                // disabled={llmStreaming && llmContinue}
                apiKey={import.meta.env.VITE_TINYMCE}
                initialValue={currentDocument.content}
                recipes={recipes}
                createVersion={createVersion}
                generateVersion={generateVersion}
                activeChunkid={activeChunkid}
                onClick={handleEditorClick}
                onMouseUp={handleEditorMouseUp}
                onEditorChange={(newValue, editor) => {
                  setValue(newValue);
                  handleEditorOnChange();
                }}
                init={{
                  newdocument_content: "",
                  inline_boundaries_selector: "a[href],code,b,i,strong,em,span[id]",
                  resize: false,
                  content_css: "document",
                  toolbar_mode: "sliding",
                  menubar: "file edit format help",
                  menu: {
                    file: {
                      title: "File",
                      items: "newABScribeDocument | preview | export print | deleteallconversations",
                    },
                    edit: {
                      title: "Edit",
                      items: "undo redo | cut copy paste pastetext | selectall | searchreplace",
                    },
                    // view: {
                    //   title: "View",
                    //   items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
                    // },
                    // insert: {
                    //   title: "Insert",
                    //   items: "image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
                    // },
                    format: {
                      title: "Format",
                      items: "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
                    },
                    // tools: {
                    //   title: "Tools",
                    //   items: "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
                    // },
                    // table: {
                    //   title: "Table",
                    //   items: "inserttable | cell row column | advtablesort | tableprops deletetable",
                    // },
                    help: { title: "Help", items: "help" },
                  },
                  skin: "borderless",
                  height: "100%",
                  plugins: [
                    "code",
                    "link",
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  formats: {
                    factor: {
                      inline: "span",
                      classes: "chunk %factorId",
                      styles: {
                        backgroundColor: "%color",
                      },
                    },
                    ai: {
                      block: "p",
                      styles: {
                        backgroundColor: "%color",
                        border: "1px solid #2276d2",
                        "border-radius": "5px",
                        padding: "2px 5px",
                        margin: "0 2px",
                      },
                    },
                  },
                  toolbar: "blocks fontfamily fontsize |variationsidebar recipes save|" +
                    "bold italic forecolor hilitecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist",

                  setup: (editor) => {
                    editor.on('keydown', (e) => { handleKeydown(e) });
                    editor.on('click', (e) => { handleClick(e) });
                    editor.on("ExecCommand", function (e) {
                      if ("mceNewDocument" == e.command) {
                        createNewBlankDocument();
                      }
                    });
                    editor.ui.registry.addMenuItem("newABScribeDocument", {
                      text: "New Document",
                      icon: "document-properties",
                      onAction: function () {
                        createNewBlankDocument();
                      },
                    });
                    editor.ui.registry.addIcon("WandMagic", '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/></svg>');
                    editor.ui.registry.addIcon("VariationSidebar", '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/></svg>');
                    editor.ui.registry.addIcon("star", '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>');
                    editor.ui.registry.addMenuButton("recipes", {
                      icon: "WandMagic",
                      text: "LLM Recipes",
                      tooltip: "LLM Recipes",
                      disabled: true,
                      fetch: function (callback) {
                        callback(
                          editorRef.current.props.recipes.map((recipe) => ({
                            type: "menuitem",
                            icon: "star",
                            text: recipe.name.toUpperCase(),
                            onAction: async function () {
                              if (editorRef.current.props.activeChunkid) {
                                editorRef.current.props.generateVersion(
                                  editorRef.current.props.activeChunkid,
                                  recipe.prompt
                                );
                              }
                            },
                          }))
                        );
                      },
                      onSetup: (buttonApi) => {
                        const editorEventCallback = (eventApi) => {
                          if (editorRef.current && editorRef.current.props) {
                            buttonApi.setEnabled(
                              eventApi.element.classList.contains("chunk") &&
                              editorRef.current.props.recipes.length > 0
                            );
                          }
                        };
                        editor.on("NodeChange", editorEventCallback);
                        return () => editor.off("NodeChange", editorEventCallback);
                      },
                    });
                    editor.ui.registry.addButton("save", {
                      icon: "save",
                      text: "Save and Continue",
                      onAction: () => {
                        const newContent = editorRef.current.editor.getContent();
                        handleSaveButtonClick(currentDocument._id);
                        updateDocument(currentDocument._id, newContent)
                          .then(() => {
                            editorRef.current.editor.notificationManager.open(
                              {
                                text: "Document saved.",
                                type: "success",
                                timeout: 1000,
                              }
                            );
                          })
                          .catch((error) => {
                            console.error("Failed to save document in backend:", error);
                            editorRef.current.editor.notificationManager.open(
                              {
                                text: "Failed to save document to backend.",
                                type: "error",
                                timeout: 1000,
                              }
                            );
                          });
                      },
                    });
                    editor.ui.registry.addToggleButton("variationsidebar", {
                      icon: "VariationSidebar",
                      text: "Variation Sidebar",
                      tooltip: "Variation Sidebar",
                      onAction: () => {
                        setVariationSidebarVisible((prevState) => !prevState);
                      },
                    });
                  },
                  content_style: ".chunk {padding: 2px 0px; border: 1px solid #2276d2; border-radius: 5px;} #llmresult { color:#D7D7D7 } ",
                }}
              />
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center full-height">
              <Spinner animation="border" role="status" />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
