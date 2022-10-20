import type { NextPage } from "next";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import SetupView from "../../components/pages/setup";

const SetupPage: NextPage = () => {
  return <SetupView />;
};

export default withAuthenticationRequired(SetupPage);
