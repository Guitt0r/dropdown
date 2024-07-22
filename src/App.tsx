import { Dropdown } from "./components/Dropdown";

const App = () => {
  const searchFn = async () => {
    //search logic here
  };
  return (
    <div className="h-screen flex gap-4 p-10 justify-center font-inter">
      <Dropdown searchFn={searchFn} placeholder="Оберіть фрукт">
        <div>Банан</div>
        <div>Яблуко</div>
        <div>Груша</div>
        <div>Апельсин</div>
      </Dropdown>
      <Dropdown searchFn={searchFn} placeholder="Оберіть овоч">
        <div>Огірок</div>
        <div>Помідор</div>
        <div>Картопля</div>
        <div>Горох</div>
      </Dropdown>
    </div>
  );
};

export default App;
