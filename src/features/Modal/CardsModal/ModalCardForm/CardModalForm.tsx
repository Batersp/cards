import React, { useState } from 'react';

import FormGroup from '@mui/material/FormGroup/FormGroup';
import { Form, FormikProps } from 'formik';

import { ImageInput } from '../../../../common/components/Forms/ImageInput/ImageInput';

import styles from './CardModalForm.module.scss';

import { ModalButtonGroup } from 'common/components/Buttons/ModalButtonGroup/ModalButtonGroup';
import { ProjectTextField } from 'common/components/Forms/ProjectTextField/ProjectTextField';
import { Selected } from 'common/components/Selected/Selected';
import { useAppDispatch } from 'common/hooks/hooks';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { CardModalFormTypes } from 'features/Modal/CardsModal/ModalCardForm/CardModalFormType';
import { closeModal } from 'features/Modal/modalReduscer';

type PropsType = {
  formik: FormikProps<CardModalFormTypes>;
  setQuestion: (value: string) => void;
  question: string;
};
export const CardModalForm: React.FC<PropsType> = ({
  formik,
  setQuestion,
  question,
}): ReturnComponentType => {
  const { isValid, dirty, isSubmitting, values } = {
    ...formik,
  };
  const dispatch = useAppDispatch();
  const [val, setVal] = useState(values);

  console.log('formik: ', isValid, dirty);
  console.log(values);
  console.log(question);
  const changeQuestionValue = (value: string): void => {
    values.questionImg = value;
    setVal({ ...val, questionImg: value });
  };

  const changeAnswerValue = (value: string): void => {
    values.answerImg = value;
    setVal({ ...val, answerImg: value });
  };

  const onClose = (): void => {
    dispatch(closeModal());
  };

  return (
    <Form>
      <FormGroup className={styles.main}>
        <div className={styles.select}>
          <Selected callback={setQuestion} />
        </div>
        <div className={styles.fields}>
          {question === 'text' ? (
            <div>
              <ProjectTextField
                name="question"
                label="Question"
                disabled={isSubmitting}
              />
              <ProjectTextField name="answer" label="Answer" disabled={isSubmitting} />
            </div>
          ) : (
            <div>
              <ImageInput
                name="questionImg"
                title="Upload question"
                value={values.questionImg}
                changeValue={changeQuestionValue}
              />
              <ImageInput
                name="answerImg"
                title="Upload answer"
                value={values.answerImg}
                changeValue={changeAnswerValue}
              />
            </div>
          )}
        </div>
        {question === 'text' ? (
          <ModalButtonGroup onClose={onClose} dirty={dirty} isValid={isValid} />
        ) : (
          <ModalButtonGroup
            onClose={onClose}
            dirty
            isValid={!!(values.questionImg && values.answerImg)}
          />
        )}
      </FormGroup>
    </Form>
  );
};
