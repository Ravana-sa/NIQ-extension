import resetIcon from "data-base64:~assets/reset.png"
import upArrow from "data-base64:~assets/up-arrow.png"
import React, { useCallback } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import extractProjectNumber from "~useFullFunctions/extractProjectNumber"
import getScript from "~useFullFunctions/getScript"

import initialState from "../Data/InitialState"

function AutomationUi({ currentPageUrl }) {
  const [data, setData] = useStorage(
    extractProjectNumber(currentPageUrl) + "data",
    structuredClone(initialState)
  )

  const handleProjectTypeCollapse = useCallback(
    ({ projectType: projectTypeClicked }: { projectType: string }) => {
      const newData = data.map((projectTypeItem) => {
        const { projectType, expand: expanded } = projectTypeItem

        if (projectType !== projectTypeClicked) {
          return projectTypeItem
        } else {
          return { ...projectTypeItem, expand: !expanded }
        }
      })

      setData(structuredClone(newData))
    },
    [data]
  )

  const handleTaskCollapse = useCallback(
    ({
      projectType: projectTypeClicked,
      taskName: taskNameClicked
    }: {
      projectType: string
      taskName: string
    }) => {
      const newData = data.map((projectTypeItem) => {
        const { projectType } = projectTypeItem

        if (projectType !== projectTypeClicked) {
          return projectTypeItem
        } else {
          return {
            ...projectTypeItem,
            tasks: projectTypeItem.tasks.map((task) => {
              const { expand, taskName } = task

              if (taskName !== taskNameClicked) {
                return task
              } else {
                return { ...task, expand: !expand }
              }
            })
          }
        }
      })

      setData(structuredClone(newData))
    },
    [data]
  )

  const handleDoneButtonClick = useCallback(
    (
      event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
      { projectType: projectTypeClicked, taskName: taskNameClicked }
    ) => {
      event.stopPropagation()

      const newData = data.map((projectTypeItem) => {
        const { projectType } = projectTypeItem

        if (projectType !== projectTypeClicked) {
          return projectTypeItem
        } else {
          return {
            ...projectTypeItem,
            tasks: projectTypeItem.tasks.map((task) => {
              const { done, taskName } = task

              if (taskName !== taskNameClicked) {
                return task
              } else {
                return { ...task, done: !done }
              }
            })
          }
        }
      })

      setData(structuredClone(newData))
    },
    [data]
  )

  const handleScriptButtonOnClick = useCallback(
    ({ scriptName }) => {
      const functionToExecute = getScript(scriptName)
      functionToExecute()
    },
    [data]
  )

  const handleReset = useCallback(() => {
    setData(structuredClone(initialState))
  }, [data])

  return (
    <div className="block min-w-[200px] whitespace-nowrap font-[montserrat] text-slate-300 bg-slate-950 font-semibold py-3 px-4 pt-6">
      {data.map(({ projectType, tasks, expand: expand }, index) => {
        return (
          <div className="bg-slate-800" key={index}>
            <div
              className="text-base cursor-pointer text-slate-300 text-center p-2 pt-3"
              onClick={() => handleProjectTypeCollapse({ projectType })}>
              <span className="text-2xl">{projectType} </span>
              <span>
                <img
                  src={upArrow}
                  alt={expand ? "menu expanded" : "menu collapsed"}
                  className={
                    expand
                      ? "inline-block w-6 pl-2 -scale-y-100 transition-all duration-150"
                      : "inline-block w-6 pl-2 transition-all duration-150"
                  }
                />
              </span>
            </div>
            <div
              className={
                expand
                  ? "transition-max-h duration-150 ease-in-out max-h-[2000px] overflow-hidden bg-slate-800 my-2 w-full"
                  : "transition-max-h duration-150 ease-in-out max-h-0 overflow-hidden bg-slate-800  my-2"
              }>
              <div className="flex flex-col p-2 bg-slate-800 text-center py-2">
                {tasks.map(
                  ({ taskName, tasksHelpers, expand, done }, index) => (
                    <div
                      key={index}
                      className="bg-slate-900 shadow-[0_15px_60px_-15px_rgba(0,0,0,1)]  m-1">
                      <div
                        className="py-3 text-base cursor-pointer text-slate-300 flex justify-between px-4 items-center"
                        onClick={() =>
                          handleTaskCollapse({ projectType, taskName })
                        }>
                        <label
                          className="cursor-pointer"
                          onClick={(event) => {
                            handleDoneButtonClick(event, {
                              projectType,
                              taskName
                            })
                          }}>
                          <input
                            type="checkbox"
                            className="mt-1 accent-green-500 cursor-pointer"
                            checked={done}
                          />
                          <span className="sr-only">done</span>
                        </label>
                        <span className="text-2xl">{taskName} </span>
                        <span>
                          <img
                            src={upArrow}
                            alt={expand ? "menu expanded" : "menu collapsed"}
                            className={
                              expand
                                ? "inline-block w-6 pl-2 -scale-y-100 transition-all duration-150 "
                                : "inline-block w-6 pl-2 transition-all duration-150 "
                            }
                          />
                        </span>
                      </div>

                      <div
                        className={
                          expand
                            ? "transition-max-h duration-150 ease-in-out max-h-[2000px] overflow-hidden bg-slate-800 text-center p-2"
                            : "transition-max-h duration-150 ease-in-out max-h-0 overflow-hidden bg-slate-800 text-center px-2"
                        }>
                        {tasksHelpers.map(
                          ({ scriptName, helperDisplayName }, index) => {
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  handleScriptButtonOnClick({ scriptName })
                                }}
                                className="block px-6 py-2 my-2 text-xl text-center list-none bg-black hover:cursor-pointer hover:border-l-4 hover:border-sky-800 active:scale-105 mx-auto rounded-sm max-w-xs">
                                {helperDisplayName}
                              </button>
                            )
                          }
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )
      })}
      <button
        type="reset"
        className="block m-auto bg-sky-500 rounded-sm py-2 px-8 text-xl mt-4 text-white font-medium tracking-wider"
        onClick={() => {
          handleReset()
        }}>
        Reset
        <img
          src={resetIcon}
          alt="reset icon"
          className="inline-block w-6 pl-2"
        />
      </button>
    </div>
  )
}

export default AutomationUi
