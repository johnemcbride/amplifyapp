import { Auth, DataStore } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();
  Auth.signOut().then(() => {
    navigate("/");
  });
}
