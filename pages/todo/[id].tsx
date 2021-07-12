import { observer } from "mobx-react";
import { useRouter } from "next/dist/client/router";
import { NextPage, NextPageContext } from "next";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Page, Card } from "@shopify/polaris";
import axios from "axios";

import TodoForm from "src/components/Todo/TodoForm";
import RootContext from "src/context/RootContext";

type TProps = {
  id: string;
};
const EditTodo: NextPage<TProps> = observer(({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTodo, setLoadingTodo] = useState<boolean>(false);
  const [isTodo, setIsTodo] = useState<boolean>(true);
  const store = useContext(RootContext);
  const { title, content, check, getTodo } = store.detailTodo;

  useEffect(() => {
    (async() => {
      try {
        setLoadingTodo(true);
        await getTodo(id);
      } catch (error) {
        console.log(error);
        setIsTodo(false);
      } finally {
        setLoadingTodo(false);
      }
    })()
  }, []);

  if (loadingTodo === true) return <h1> Loading </h1>;
  if (isTodo === false) return <h1> Not found </h1>;

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
      const response = await axios.put(`/api/todo/${id}`, data);
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
      title="Edit Todo"
      primaryAction={{ content: "Update", onAction: handleSubmit, loading }}
    >
      <Card sectioned>
        <TodoForm submit={handleSubmit} />
      </Card>
    </Page>
  );
});
EditTodo.getInitialProps = (context: NextPageContext) => {
  const { query } = context;
  const { id } = query;
  return { id: id as string };
};
export default EditTodo;
