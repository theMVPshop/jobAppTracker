import { withAuthenticationRequired } from "@auth0/auth0-react";
import PageLoader from "./PageLoader";

const AuthenticationGuard = (props) => {
  const component = props.component;
  const searchQuery = props.searchQuery;

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component searchQuery={searchQuery} />;
};

export default AuthenticationGuard;
