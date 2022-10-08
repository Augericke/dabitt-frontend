// Force loss of focus on enter submit
export const onEnterDownBlur = (event: any) => {
  console.log(event);
  if (event.key === "Enter" && event.shiftKey == false) {
    event.target.blur();
  }
};
