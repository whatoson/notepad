import { Link, useRouteError } from "react-router";

export function ErrorPage() {
  const error = useRouteError();
  const message =
    error instanceof Error ? error.message : "Something went wrong";
  console.error(error);

  return (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
      <p>
        <Link to="/">Return</Link>
      </p>
    </div>
  );
}
