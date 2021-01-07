import { FunctionComponent } from "react";

import "./App.css";

const App: FunctionComponent = () => {
  let fetching = false;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="app">
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="name">Nome</label>
        <input
          // value={name}
          // onChange={(event) => setName(event.target.value)}
          id="name"
          type="text"
        />
        <label htmlFor="description">Descrição</label>
        <input
          // value={description}
          // onChange={(event) => setDescription(event.target.value)}
          id="description"
          type="text"
        />
        <label htmlFor="ingredients">Ingredientes</label>
        <input
          // value={ingredients}
          // onChange={(event) => handleIngredients(event.target.value)}
          id="ingredients"
          type="text"
        />

        <button>{fetching ? "Salvando..." : "Salvar"}</button>
      </form>

      {/* <RecipesList /> */}
    </div>
  );
};

export default App;
