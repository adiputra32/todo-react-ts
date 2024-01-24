import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PlusToDo from "../../assets/plus-to-do";
import { Task } from "../../types/Task";

type Props = {
  styles: any;
  setIsElementVisible: (v: boolean) => void;
  taskForm: ReturnType<typeof useForm<Task>>;
};

const TaskForm = ({ styles, setIsElementVisible, taskForm }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const titleElement = useRef(null);

  const addNewDetails = (value: string) => {
    const prevDetails = taskForm.getValues("details");
    taskForm.setValue(`details`, [
      ...prevDetails,
      { todo: value, status: false },
    ]);
  };

  const handleKeyUp = (e: any) => {
    const value = e.target.value;

    if (e.key === "Enter" && value && value.trim() !== "") {
      addNewDetails(value);

      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    } else if (e.key === "Enter") {
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };

  const resetNewList = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value && value.trim() !== "") {
      addNewDetails(value);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleKeyUpOnUpdate = (e: any) => {
    const value = e.target.value;

    if (e.key === "Enter" && value && value.trim() !== "") {
      e.target.change();
    } else if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handleOnBlurUpdate = (
    index: number,
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (!value || value === "") {
      const newTaskDetails = taskForm
        .getValues("details")
        .filter((_, key) => key !== index);

      taskForm.setValue(`details`, newTaskDetails);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsElementVisible(true);
          } else {
            setIsElementVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleElement.current) {
      observer.observe(titleElement.current);
    }

    return () => {
      if (titleElement.current) {
        observer.unobserve(titleElement.current);
      }
    };
  }, []);

  return (
    <>
      <FormProvider {...taskForm}>
        <div className={styles["new-list-form"]}>
          <div className={styles["task-details"]}>
            <div className={styles["task-details-item-wrapper"]}>
              <Controller
                control={taskForm.control}
                name="title"
                render={({ field }) => (
                  <input
                    {...field}
                    ref={titleElement}
                    type="text"
                    className={styles["input-title"]}
                    placeholder="Title"
                  />
                )}
              />

              {taskForm.watch("details").map((value, key) => (
                <div className={styles["task-details-item"]} key={key}>
                  <label className={styles["checkbox-container"]}>
                    <Controller
                      control={taskForm.control}
                      name={`details.${key}.status`}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          className={styles["checkbox-details"]}
                          checked={value.status}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <span className={styles["checkmark"]}></span>
                  </label>

                  <Controller
                    control={taskForm.control}
                    name={`details.${key}.todo`}
                    render={({ field }) => (
                      <input
                        type="text"
                        className={styles["input-details"]}
                        style={{
                          textDecoration: taskForm.watch("details")[key].status
                            ? "line-through"
                            : "",
                        }}
                        value={value.todo}
                        placeholder="To-do"
                        onChange={field.onChange}
                        onKeyUp={(e) => handleKeyUpOnUpdate(e)}
                        onBlur={(e) => handleOnBlurUpdate(key, e)}
                      />
                    )}
                  />
                </div>
              ))}

              <div className={styles["task-details-item"]}>
                <PlusToDo />
                <input
                  ref={inputRef}
                  type="text"
                  className={styles["input-details"]}
                  placeholder="To-do"
                  onKeyUp={handleKeyUp}
                  onBlur={resetNewList}
                />
              </div>
            </div>
          </div>

          <div className={styles["task-label"]}>
            <span className={styles["choose-label"]}>Choose a Label</span>
            <div className={styles["label-options"]}>
              <div>
                <Controller
                  control={taskForm.control}
                  name="label"
                  render={({ field }) => (
                    <input
                      onChange={field.onChange}
                      checked={taskForm.getValues("label") == "Personal"}
                      type="radio"
                      value="Personal"
                      id="personal"
                    />
                  )}
                />
                <label htmlFor="personal">Personal</label>
              </div>
              <div>
                <Controller
                  control={taskForm.control}
                  name="label"
                  render={({ field }) => (
                    <input
                      onChange={field.onChange}
                      checked={taskForm.getValues("label") == "Work"}
                      type="radio"
                      value="Work"
                      id="work"
                    />
                  )}
                />
                <label htmlFor="work">Work</label>
              </div>
              <div>
                <Controller
                  control={taskForm.control}
                  name="label"
                  render={({ field }) => (
                    <input
                      onChange={field.onChange}
                      checked={taskForm.getValues("label") == "Finance"}
                      type="radio"
                      value="Finance"
                      id="finance"
                    />
                  )}
                />
                <label htmlFor="finance">Finance</label>
              </div>
              <div>
                <Controller
                  control={taskForm.control}
                  name="label"
                  render={({ field }) => (
                    <input
                      onChange={field.onChange}
                      checked={taskForm.getValues("label") == "Other"}
                      type="radio"
                      value="Other"
                      id="other"
                    />
                  )}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default TaskForm;
