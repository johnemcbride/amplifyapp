/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Member } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MemberUpdateForm(props) {
  const {
    id: idProp,
    member,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    forename: "",
    surname: "",
    dateOfBirth: "",
    addressLine1: "",
    addressLine2: "",
    town: "",
    postCode: "",
  };
  const [forename, setForename] = React.useState(initialValues.forename);
  const [surname, setSurname] = React.useState(initialValues.surname);
  const [dateOfBirth, setDateOfBirth] = React.useState(
    initialValues.dateOfBirth
  );
  const [addressLine1, setAddressLine1] = React.useState(
    initialValues.addressLine1
  );
  const [addressLine2, setAddressLine2] = React.useState(
    initialValues.addressLine2
  );
  const [town, setTown] = React.useState(initialValues.town);
  const [postCode, setPostCode] = React.useState(initialValues.postCode);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = memberRecord
      ? { ...initialValues, ...memberRecord }
      : initialValues;
    setForename(cleanValues.forename);
    setSurname(cleanValues.surname);
    setDateOfBirth(cleanValues.dateOfBirth);
    setAddressLine1(cleanValues.addressLine1);
    setAddressLine2(cleanValues.addressLine2);
    setTown(cleanValues.town);
    setPostCode(cleanValues.postCode);
    setErrors({});
  };
  const [memberRecord, setMemberRecord] = React.useState(member);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Member, idProp) : member;
      setMemberRecord(record);
    };
    queryData();
  }, [idProp, member]);
  React.useEffect(resetStateValues, [memberRecord]);
  const validations = {
    forename: [],
    surname: [],
    dateOfBirth: [],
    addressLine1: [],
    addressLine2: [],
    town: [],
    postCode: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          forename,
          surname,
          dateOfBirth,
          addressLine1,
          addressLine2,
          town,
          postCode,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Member.copyOf(memberRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "MemberUpdateForm")}
      {...rest}
    >
      <TextField
        label="Forename"
        isRequired={false}
        isReadOnly={false}
        value={forename}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename: value,
              surname,
              dateOfBirth,
              addressLine1,
              addressLine2,
              town,
              postCode,
            };
            const result = onChange(modelFields);
            value = result?.forename ?? value;
          }
          if (errors.forename?.hasError) {
            runValidationTasks("forename", value);
          }
          setForename(value);
        }}
        onBlur={() => runValidationTasks("forename", forename)}
        errorMessage={errors.forename?.errorMessage}
        hasError={errors.forename?.hasError}
        {...getOverrideProps(overrides, "forename")}
      ></TextField>
      <TextField
        label="Surname"
        isRequired={false}
        isReadOnly={false}
        value={surname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname: value,
              dateOfBirth,
              addressLine1,
              addressLine2,
              town,
              postCode,
            };
            const result = onChange(modelFields);
            value = result?.surname ?? value;
          }
          if (errors.surname?.hasError) {
            runValidationTasks("surname", value);
          }
          setSurname(value);
        }}
        onBlur={() => runValidationTasks("surname", surname)}
        errorMessage={errors.surname?.errorMessage}
        hasError={errors.surname?.hasError}
        {...getOverrideProps(overrides, "surname")}
      ></TextField>
      <TextField
        label="Date of birth"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateOfBirth: value,
              addressLine1,
              addressLine2,
              town,
              postCode,
            };
            const result = onChange(modelFields);
            value = result?.dateOfBirth ?? value;
          }
          if (errors.dateOfBirth?.hasError) {
            runValidationTasks("dateOfBirth", value);
          }
          setDateOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dateOfBirth", dateOfBirth)}
        errorMessage={errors.dateOfBirth?.errorMessage}
        hasError={errors.dateOfBirth?.hasError}
        {...getOverrideProps(overrides, "dateOfBirth")}
      ></TextField>
      <TextField
        label="Address line1"
        isRequired={false}
        isReadOnly={false}
        value={addressLine1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateOfBirth,
              addressLine1: value,
              addressLine2,
              town,
              postCode,
            };
            const result = onChange(modelFields);
            value = result?.addressLine1 ?? value;
          }
          if (errors.addressLine1?.hasError) {
            runValidationTasks("addressLine1", value);
          }
          setAddressLine1(value);
        }}
        onBlur={() => runValidationTasks("addressLine1", addressLine1)}
        errorMessage={errors.addressLine1?.errorMessage}
        hasError={errors.addressLine1?.hasError}
        {...getOverrideProps(overrides, "addressLine1")}
      ></TextField>
      <TextField
        label="Address line2"
        isRequired={false}
        isReadOnly={false}
        value={addressLine2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateOfBirth,
              addressLine1,
              addressLine2: value,
              town,
              postCode,
            };
            const result = onChange(modelFields);
            value = result?.addressLine2 ?? value;
          }
          if (errors.addressLine2?.hasError) {
            runValidationTasks("addressLine2", value);
          }
          setAddressLine2(value);
        }}
        onBlur={() => runValidationTasks("addressLine2", addressLine2)}
        errorMessage={errors.addressLine2?.errorMessage}
        hasError={errors.addressLine2?.hasError}
        {...getOverrideProps(overrides, "addressLine2")}
      ></TextField>
      <TextField
        label="Town"
        isRequired={false}
        isReadOnly={false}
        value={town}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateOfBirth,
              addressLine1,
              addressLine2,
              town: value,
              postCode,
            };
            const result = onChange(modelFields);
            value = result?.town ?? value;
          }
          if (errors.town?.hasError) {
            runValidationTasks("town", value);
          }
          setTown(value);
        }}
        onBlur={() => runValidationTasks("town", town)}
        errorMessage={errors.town?.errorMessage}
        hasError={errors.town?.hasError}
        {...getOverrideProps(overrides, "town")}
      ></TextField>
      <TextField
        label="Post code"
        isRequired={false}
        isReadOnly={false}
        value={postCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateOfBirth,
              addressLine1,
              addressLine2,
              town,
              postCode: value,
            };
            const result = onChange(modelFields);
            value = result?.postCode ?? value;
          }
          if (errors.postCode?.hasError) {
            runValidationTasks("postCode", value);
          }
          setPostCode(value);
        }}
        onBlur={() => runValidationTasks("postCode", postCode)}
        errorMessage={errors.postCode?.errorMessage}
        hasError={errors.postCode?.hasError}
        {...getOverrideProps(overrides, "postCode")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || member)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || member) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
