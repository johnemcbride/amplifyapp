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
import { Enrolment } from "../models";
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
export default function EnrolmentCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    bands: [],
    status: "",
    term: "",
    ratedescription: "",
    rate: "",
    stripeRef: "",
  };
  const [bands, setBands] = React.useState(initialValues.bands);
  const [status, setStatus] = React.useState(initialValues.status);
  const [term, setTerm] = React.useState(initialValues.term);
  const [ratedescription, setRatedescription] = React.useState(
    initialValues.ratedescription
  );
  const [rate, setRate] = React.useState(initialValues.rate);
  const [stripeRef, setStripeRef] = React.useState(initialValues.stripeRef);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setBands(initialValues.bands);
    setCurrentBandsValue("");
    setStatus(initialValues.status);
    setTerm(initialValues.term);
    setRatedescription(initialValues.ratedescription);
    setRate(initialValues.rate);
    setStripeRef(initialValues.stripeRef);
    setErrors({});
  };
  const [currentBandsValue, setCurrentBandsValue] = React.useState("");
  const bandsRef = React.createRef();
  const validations = {
    bands: [],
    status: [],
    term: [],
    ratedescription: [],
    rate: [],
    stripeRef: [],
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
          bands,
          status,
          term,
          ratedescription,
          rate,
          stripeRef,
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
          await DataStore.save(new Enrolment(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "EnrolmentCreateForm")}
      {...rest}
    >
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bands: values,
              status,
              term,
              ratedescription,
              rate,
              stripeRef,
            };
            const result = onChange(modelFields);
            values = result?.bands ?? values;
          }
          setBands(values);
          setCurrentBandsValue("");
        }}
        currentFieldValue={currentBandsValue}
        label={"Bands"}
        items={bands}
        hasError={errors.bands?.hasError}
        setFieldValue={setCurrentBandsValue}
        inputFieldRef={bandsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bands"
          isRequired={false}
          isReadOnly={false}
          value={currentBandsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bands?.hasError) {
              runValidationTasks("bands", value);
            }
            setCurrentBandsValue(value);
          }}
          onBlur={() => runValidationTasks("bands", currentBandsValue)}
          errorMessage={errors.bands?.errorMessage}
          hasError={errors.bands?.hasError}
          ref={bandsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bands")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bands,
              status: value,
              term,
              ratedescription,
              rate,
              stripeRef,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Term"
        isRequired={false}
        isReadOnly={false}
        value={term}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bands,
              status,
              term: value,
              ratedescription,
              rate,
              stripeRef,
            };
            const result = onChange(modelFields);
            value = result?.term ?? value;
          }
          if (errors.term?.hasError) {
            runValidationTasks("term", value);
          }
          setTerm(value);
        }}
        onBlur={() => runValidationTasks("term", term)}
        errorMessage={errors.term?.errorMessage}
        hasError={errors.term?.hasError}
        {...getOverrideProps(overrides, "term")}
      ></TextField>
      <TextField
        label="Ratedescription"
        isRequired={false}
        isReadOnly={false}
        value={ratedescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bands,
              status,
              term,
              ratedescription: value,
              rate,
              stripeRef,
            };
            const result = onChange(modelFields);
            value = result?.ratedescription ?? value;
          }
          if (errors.ratedescription?.hasError) {
            runValidationTasks("ratedescription", value);
          }
          setRatedescription(value);
        }}
        onBlur={() => runValidationTasks("ratedescription", ratedescription)}
        errorMessage={errors.ratedescription?.errorMessage}
        hasError={errors.ratedescription?.hasError}
        {...getOverrideProps(overrides, "ratedescription")}
      ></TextField>
      <TextField
        label="Rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={rate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              bands,
              status,
              term,
              ratedescription,
              rate: value,
              stripeRef,
            };
            const result = onChange(modelFields);
            value = result?.rate ?? value;
          }
          if (errors.rate?.hasError) {
            runValidationTasks("rate", value);
          }
          setRate(value);
        }}
        onBlur={() => runValidationTasks("rate", rate)}
        errorMessage={errors.rate?.errorMessage}
        hasError={errors.rate?.hasError}
        {...getOverrideProps(overrides, "rate")}
      ></TextField>
      <TextField
        label="Stripe ref"
        isRequired={false}
        isReadOnly={false}
        value={stripeRef}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bands,
              status,
              term,
              ratedescription,
              rate,
              stripeRef: value,
            };
            const result = onChange(modelFields);
            value = result?.stripeRef ?? value;
          }
          if (errors.stripeRef?.hasError) {
            runValidationTasks("stripeRef", value);
          }
          setStripeRef(value);
        }}
        onBlur={() => runValidationTasks("stripeRef", stripeRef)}
        errorMessage={errors.stripeRef?.errorMessage}
        hasError={errors.stripeRef?.hasError}
        {...getOverrideProps(overrides, "stripeRef")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
