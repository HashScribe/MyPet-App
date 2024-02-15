import React from "react";
import { Button } from "react-native-paper";
import { IButtonInterface } from "../IButtonInterface";

const PrimaryButton = ({ title }: IButtonInterface) => {
  return <Button mode="contained">{title}</Button>;
};

export default PrimaryButton;
