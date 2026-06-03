import Header from "../../components/Header";
import NewMovieClient from "./NewMovieClient";
import styles from "../movies.module.css";

export default function NewMoviePage() {
  return (
    <main className="page-shell">
      <Header />
      <section className={styles.formPage}>
        <h1>Přidat film</h1>
        <NewMovieClient />
      </section>
    </main>
  );
}
