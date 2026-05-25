import Header from "../../../components/Header";
import EditMovieClient from "./EditMovieClient";
import styles from "../../movies.module.css";

export default async function EditMoviePage({ params }) {
  const { id } = await params;

  return (
    <main className="page-shell">
      <Header />
      <section className={styles.formPage}>
        <h1>Upravit film</h1>
        <EditMovieClient id={id} />
      </section>
    </main>
  );
}
