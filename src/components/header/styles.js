import styled from "styled-components"

export const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  margin: 0.5rem;


  border: none;
  background: none;
  border-radius: 20px;
  transition: 0.2s;

  &:hover {
    background-color: #fff;

    svg {
      color: #252525
    }
  }


`
