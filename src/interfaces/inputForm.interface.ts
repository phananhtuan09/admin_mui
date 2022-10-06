export default interface inputForm {
  id: string;
  name: string;
  type: string;
  onChange: Function;
  onBlur: Function;
  value: string;
  error: any;
  title?: string;
}
