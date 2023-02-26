/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Member } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
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
    dateofbirth: "",
    ethnicity: "",
    instruments: [],
    createdAt: "",
  };
  const [forename, setForename] = React.useState(initialValues.forename);
  const [surname, setSurname] = React.useState(initialValues.surname);
  const [dateofbirth, setDateofbirth] = React.useState(
    initialValues.dateofbirth
  );
  const [ethnicity, setEthnicity] = React.useState(initialValues.ethnicity);
  const [instruments, setInstruments] = React.useState(
    initialValues.instruments
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = memberRecord
      ? { ...initialValues, ...memberRecord }
      : initialValues;
    setForename(cleanValues.forename);
    setSurname(cleanValues.surname);
    setDateofbirth(cleanValues.dateofbirth);
    setEthnicity(cleanValues.ethnicity);
    setInstruments(cleanValues.instruments ?? []);
    setCurrentInstrumentsValue("");
    setCreatedAt(cleanValues.createdAt);
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
  const [currentInstrumentsValue, setCurrentInstrumentsValue] =
    React.useState("");
  const instrumentsRef = React.createRef();
  const validations = {
    forename: [],
    surname: [],
    dateofbirth: [],
    ethnicity: [],
    instruments: [],
    createdAt: [{ type: "Required" }],
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
          dateofbirth,
          ethnicity,
          instruments,
          createdAt,
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
              dateofbirth,
              ethnicity,
              instruments,
              createdAt,
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
              dateofbirth,
              ethnicity,
              instruments,
              createdAt,
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
        label="Dateofbirth"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={dateofbirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateofbirth: value,
              ethnicity,
              instruments,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.dateofbirth ?? value;
          }
          if (errors.dateofbirth?.hasError) {
            runValidationTasks("dateofbirth", value);
          }
          setDateofbirth(value);
        }}
        onBlur={() => runValidationTasks("dateofbirth", dateofbirth)}
        errorMessage={errors.dateofbirth?.errorMessage}
        hasError={errors.dateofbirth?.hasError}
        {...getOverrideProps(overrides, "dateofbirth")}
      ></TextField>
      <TextField
        label="Ethnicity"
        isRequired={false}
        isReadOnly={false}
        value={ethnicity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateofbirth,
              ethnicity: value,
              instruments,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.ethnicity ?? value;
          }
          if (errors.ethnicity?.hasError) {
            runValidationTasks("ethnicity", value);
          }
          setEthnicity(value);
        }}
        onBlur={() => runValidationTasks("ethnicity", ethnicity)}
        errorMessage={errors.ethnicity?.errorMessage}
        hasError={errors.ethnicity?.hasError}
        {...getOverrideProps(overrides, "ethnicity")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateofbirth,
              ethnicity,
              instruments: values,
              createdAt,
            };
            const result = onChange(modelFields);
            values = result?.instruments ?? values;
          }
          setInstruments(values);
          setCurrentInstrumentsValue("");
        }}
        currentFieldValue={currentInstrumentsValue}
        label={"Instruments"}
        items={instruments}
        hasError={errors.instruments?.hasError}
        setFieldValue={setCurrentInstrumentsValue}
        inputFieldRef={instrumentsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Instruments"
          isRequired={false}
          isReadOnly={false}
          value={currentInstrumentsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.instruments?.hasError) {
              runValidationTasks("instruments", value);
            }
            setCurrentInstrumentsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("instruments", currentInstrumentsValue)
          }
          errorMessage={errors.instruments?.errorMessage}
          hasError={errors.instruments?.hasError}
          ref={instrumentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "instruments")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              forename,
              surname,
              dateofbirth,
              ethnicity,
              instruments,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
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
