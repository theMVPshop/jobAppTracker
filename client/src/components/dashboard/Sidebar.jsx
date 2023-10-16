import styled from "styled-components";
import UploadResume from "./UploadResume";

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarContent>
        <UploadResume />
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  display: flex;
  border-top: 1px solid ${(props) => props.theme.colors.gray2};
  width: 600px;
`;

const SidebarContent = styled.div`
  width: 200px;
  margin: 25px;
`;
