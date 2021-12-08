interface HomePageDashboardProps {
  customClassName?: string;
}

function HomePageDashboard({customClassName}: HomePageDashboardProps) {
  return (
    <div className={customClassName}>
      <h1>{"Dashboard"}</h1>
    </div>
  );
}

export default HomePageDashboard;
