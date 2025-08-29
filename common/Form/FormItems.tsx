import {
  Col,
  Form,
  Input,
  InputNumber,
  GetProps,
  Radio,
  Select,
  DatePicker,
  FormItemProps as AntFormItemProps,
  ColProps,
  SelectProps,
  InputProps,
  InputNumberProps,
} from "antd";
import { PasswordProps, TextAreaProps } from "antd/es/input";
import { OTPProps } from "antd/es/input/OTP";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";

type IComponentProps = {
  colProps?: ColProps;
  formItemProps?: AntFormItemProps;
};
type IProps<T, P> = {
  AntInputCom: T;
  props?: P;
};
const antdGenericComponent = <
  T extends React.ElementType,
  P extends React.ComponentProps<T>
>({
  AntInputCom,
  props,
}: IProps<T, P>) => {
  return ({
    colProps,
    formItemProps,
    ...rest
  }: IComponentProps & React.ComponentProps<T>) => (
    <Col {...colProps}>
      <Form.Item
        {...formItemProps}
        labelCol={{
          style: {
            margin: 0,
            padding: 0,
            height: 30,
            fontWeight: 600,
          },
        }}
      >
        <AntInputCom {...(rest as P)} />
      </Form.Item>
    </Col>
  );
};
// FORM ITEM INPUT
export const FormItemInput = antdGenericComponent<typeof Input, InputProps>({
  AntInputCom: Input,
});

// FORM ITEM PASSWORD
export const FormItemPassword = antdGenericComponent<
  typeof Input.Password,
  PasswordProps
>({
  AntInputCom: Input.Password,
});

// FORM ITEM TEXT AREA
export const FormItemTextarea = antdGenericComponent<
  typeof Input.TextArea,
  TextAreaProps
>({
  AntInputCom: Input.TextArea,
});

// FORM ITEM INPUT NUMBER
export const FormItemInputNumber = antdGenericComponent<
  typeof InputNumber,
  InputNumberProps
>({ AntInputCom: InputNumber });

// 3rd PARTY PHONE INPUT
export const FormItemPhoneNumber = antdGenericComponent<
  typeof PhoneInput,
  PhoneInputProps
>({
  AntInputCom: PhoneInput,
});

// FORM ITEM INPUT OTP
export const FormItemInputOTP = antdGenericComponent<
  typeof Input.OTP,
  OTPProps
>({ AntInputCom: Input.OTP });

// FORM ITEM INPUT RADIO
export const FormItemRadioGroup = antdGenericComponent<
  typeof Radio.Group,
  GetProps<typeof Radio.Group>
>({ AntInputCom: Radio.Group });

// FORM ITEM SELECT
export const FormItemSelect = antdGenericComponent<typeof Select, SelectProps>({
  AntInputCom: Select,
});

// FORM ITEM DATE PICKER
export const FormItemDatePicker = antdGenericComponent<
  typeof DatePicker,
  GetProps<typeof DatePicker>
>({ AntInputCom: DatePicker });

// FORM ITEM DATE PICKER RANGE
export const FormItemDatePickerRange = antdGenericComponent<
  typeof DatePicker.RangePicker,
  GetProps<typeof DatePicker.RangePicker>
>({ AntInputCom: DatePicker.RangePicker });
