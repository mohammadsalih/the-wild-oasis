import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import SideBar from "./ui/SideBar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);

  padding: 4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  max-width: 120rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />

      <Header />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  height: 100dvh;
`;
