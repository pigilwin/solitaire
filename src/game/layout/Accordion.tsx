import { PropsWithChildren, useState } from "react";
import { CypressTesting } from "types/test";
interface AccordionProps extends CypressTesting {
  title: string;
}

export const Accordion = ({title, children, testID}: PropsWithChildren<AccordionProps>): JSX.Element | null => {
  
  let currentTitle = title;
  const [open, setOpen] = useState(false);
  
  const onClickHandler = (): void => {
    setOpen(!open);
  };

  let classes: string[] = ['hidden', 'p-4'];
  if (open) {
    currentTitle = 'Click to close the panel';
    classes = ['p-4'];
  }

  return (
    <div className="w-full bg-gray-400 rounded-md dark:bg-gray-600">
      <h2 className="cursor-pointer p-4" data-cy-test-id={testID} onClick={onClickHandler}>{currentTitle}</h2>
      <div className={classes.join(' ')}>
        {children}
      </div>
    </div>
  );
}