import { Page, Card } from "@shopify/polaris";
import React, { ChangeEvent, useContext, useState } from "react";
import { observer } from "mobx-react";

import axios from "axios";
import { useRouter } from "next/dist/client/router";

import TodoForm from "src/components/Todo/TodoForm";
import RootContext from "src/context/RootContext";

const Home = observer(() => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const store = useContext(RootContext);
  const { title, content, check } = store.detailTodo;

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setLoading(true);
      console.log({ content, check });
      const data = {
        title,
        content,
        check: check,
      };
      const response = await axios.post("/api/todo", data);
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    
  };
  
  return (
    <Page
      breadcrumbs={[{ content: "Todo App", url: "/" }]}
      primaryAction={{ content: "Add", onAction: handleSubmit, loading }}
    >
      <Card title="Create Todo" sectioned>
        <TodoForm submit={handleSubmit} />
      </Card>
    </Page>
  );
});
export default Home;
