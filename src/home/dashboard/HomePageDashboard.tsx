import "./_home-page-dashboard.scss";

interface HomePageDashboardProps {
  customClassName?: string;
}

function HomePageDashboard({customClassName}: HomePageDashboardProps) {
  return (
    <div className={customClassName}>
      <div className={"home-page-dashboard__content"}>
        <h1>{"Dashboard"}</h1>
      </div>
    </div>
  );
}

export default HomePageDashboard;
