import {
    Container,
    StyledDiv,
    DetailsText,
    ContainerDiv,
    AddDiv,
    AddIconImage,
    SubjectText,
  } from './StyledComponents';
  import AddIcon from '../../../../../assets/images/add.png';



const  CreateCard = (props) => {
    const { title } = props;
    const { data } = props;
    const { onButtonClick } = props;
    return (
      <ContainerDiv>
        <StyledDiv>
          <Container>
            <AddDiv onClick={onButtonClick}>
              <AddIconImage src={AddIcon} />
            </AddDiv>
            <SubjectText fontStyle="bold" bottomPadding>
              {title}
            </SubjectText>
            <DetailsText center>
              {data}
            </DetailsText>
          </Container>
        </StyledDiv>
      </ContainerDiv>
    );
  }

  export default CreateCard;