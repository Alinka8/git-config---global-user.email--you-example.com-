interface ICard {
  onClick: () => void;
  flag: string;
  name: string;
  officialName?: string;
  capital: string;
  population: number;
}

export const NeighborsCard = (props: ICard) => {
  return (
    <div>
      <img
        src={props.flag}
        className="card-img"
        alt="none"
        width={"100%"}
        onClick={props.onClick}
      />
      <h6 className="card-title">
        {props.name} - {props.officialName}
      </h6>
      <div className="text-start">
        <p className="small m-0">Capital: {props.capital}</p>
        <p className="small m-0">Population: {props.population}</p>
      </div>
    </div>
  );
};
