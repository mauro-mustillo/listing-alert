import React from 'react';
import { Container, Row, Col, UncontrolledCollapse, CardBody, Card } from 'reactstrap';
import './Faq.scss';

const questions = [{
  question: 'What do I need to have to setup my account',
  answer: 'You will need an account number, a telephone number, and a valid email address.',
},
{
  question: 'Where do I go to setup an account',
  answer: 'To setup your account, click the SIGN UP link on the right side of the navbar.',
},
{
  question: 'Question Number 3 will go here',
  answer: 'Unfortuntaly, I cannot give the answer to a question I do not know.',
},
{
  question: 'What\'s your cancellation policy?',
  answer: '*NOT A REAL ANSWER* After cancelling, the accout will remain active until the next recurring payment would be due.',
}];

const renderQuestions = () => {
  return questions.map((question, index) => (
    <Col md="6" key={String(index)}>
      <div className="d-flex justify-content-between faq-header">
        <h4 className="primary-color lato">{question.question}</h4>
        <span id={`toggler-${index}`}>+</span>
      </div>
      <UncontrolledCollapse toggler={`#toggler-${index}`}>
        <Card>
          <CardBody className="catamaran">
            {question.answer}
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </Col>
  ));
}

const FaqComponent = () => (
  <div id="navFaq">
    <h1 className="primary-color lato faq-title text-center">Frequently Asked Questions</h1>
    <p className="catamaran text-center faq-sub-title">
      We believe in making simple and fair pricing plans. Choose your next successful plan and get started today!
    </p>
    <Container>
      <Row>
        {renderQuestions()}
      </Row>
    </Container>
  </div>
);


export default FaqComponent;
