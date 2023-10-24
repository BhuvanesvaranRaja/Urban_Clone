import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Container,
  Heading,
} from "@chakra-ui/react";
import React from "react";

const FAQAccordion = () => {
  const faqData = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Order History' section. There, you will find the tracking information for your recent orders.",
    },
    {
      question: "What are the shipping options available?",
      answer:
        "We offer standard shipping and expedited shipping options. The delivery times and costs vary depending on the shipping method you choose. You can review the shipping details at checkout.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return items within 30 days of purchase for a full refund. Please make sure the items are in their original condition with all tags and packaging intact. Some exclusions may apply, so please review our detailed return policy for more information.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries. Shipping fees and delivery times may vary depending on the destination. During checkout, you can select your country to view available shipping options and costs.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through our 'Contact Us' page on our website. We are available to assist you via email or phone during our business hours.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods, including credit and debit cards, PayPal, and other secure online payment options. At checkout, you can choose your preferred payment method.",
    },
    {
      question: "How can I change or cancel my order?",
      answer:
        "To change or cancel your order, please contact our customer support as soon as possible. We'll do our best to accommodate your request, but it may depend on the order's status and whether it has already been processed or shipped.",
    },
  ];
  return (
    <>
      <Text
        fontSize="x-large"
        fontWeight="bold"
        color={"blackAplha"}
        marginTop={"8"}>
        Frequently asked question
      </Text>
      <Accordion allowToggle marginTop={"5"}>
        {faqData.map((faq, index) => (
          <AccordionItem key={index} padding={"3"}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontSize="lg" fontWeight="semibold">
                    {faq.question}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text fontSize="md">{faq.answer}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default FAQAccordion;
