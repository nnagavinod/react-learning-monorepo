// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <NxWelcome title="@react-learning-monorepo/ecommerce-platform" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
      <div>
        <p>This is the ecommerce-platform application.</p>
        <p>Build your e-commerce features here.</p>
      </div>
      {/* END: routes */}
    </div>
  );
}

export default App;
