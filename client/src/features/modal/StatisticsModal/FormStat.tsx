import { useAppSelector } from "@/shared/hooks/reduxHooks";

export default function FormStat() {
  const user = useAppSelector((state) => state.user);
  return (
    <div>
      <p style={{ fontSize: "19px" }}>За каждого персонажа сыграно партий:</p>
      {[
        { label: "Мирный житель", count: user.user?.civilianCount },
        { label: "Мафия", count: user.user?.mafiaCount },
        { label: "Доктор", count: user.user?.doctorCount },
        { label: "Любовница", count: user.user?.ladyCount },
      ].map(({ label, count }) => (
        <p key={label}>{`${label}: ${count}`}</p>
      ))}
    </div>
  );
}
