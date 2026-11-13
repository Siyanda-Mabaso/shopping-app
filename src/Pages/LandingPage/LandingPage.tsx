import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      {/* NAVBAR */}
      <header className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <span>🛒</span>
          ShopList
        </Link>

        <nav className={styles.navLinks}>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </nav>

        <div className={styles.navButtons}>
          <Link to="/login" className={styles.loginButton}>
            Login
          </Link>

          <Link to="/signup" className={styles.signupButton}>
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main>
        <section id="home" className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.tagline}>
              ✨ YOUR SMART SHOPPING COMPANION
            </span>

            <h1>
              Shopping Made
              <span> Simple & Organised.</span>
            </h1>

            <p>
              Take control of your shopping with ShopList.
              Create lists, track your items and make every
              shopping trip easier.
            </p>

            <div className={styles.heroButtons}>
              <Link to="/signup" className={styles.primaryButton}>
                Get Started Free →
              </Link>

              <Link to="/login" className={styles.secondaryButton}>
                Login to Your Account
              </Link>
            </div>

            <div className={styles.heroInfo}>
              <span>✓ Easy to use</span>
              <span>✓ Stay organised</span>
              <span>✓ Track your progress</span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.shoppingCard}>
              <div className={styles.cardHeader}>
                <div>
                  <span>MY SHOPPING LIST</span>
                  <h2>Weekly Groceries 🛒</h2>
                </div>
                <span className={styles.cardIcon}>✓</span>
              </div>

              <div className={styles.progress}>
                <div className={styles.progressText}>
                  <span>Shopping progress</span>
                  <strong>3 of 5 completed</strong>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill}></div>
                </div>
              </div>

              <div className={styles.shoppingItems}>
                <div className={styles.shoppingItem}>
                  <span className={styles.checked}>✓</span>
                  <span className={styles.done}>Fresh Milk</span>
                  <small>2 pcs</small>
                </div>

                <div className={styles.shoppingItem}>
                  <span className={styles.checked}>✓</span>
                  <span className={styles.done}>Brown Bread</span>
                  <small>1 pc</small>
                </div>

                <div className={styles.shoppingItem}>
                  <span className={styles.checked}>✓</span>
                  <span className={styles.done}>Eggs</span>
                  <small>1 tray</small>
                </div>

                <div className={styles.shoppingItem}>
                  <span className={styles.unchecked}></span>
                  <span>Apples</span>
                  <small>6 pcs</small>
                </div>

                <div className={styles.shoppingItem}>
                  <span className={styles.unchecked}></span>
                  <span>Orange Juice</span>
                  <small>2 bottles</small>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span>You're doing great!</span>
                <span>🎉</span>
              </div>
            </div>

            <div className={styles.floatingBadge}>
              <span>✅</span>
              <div>
                <strong>Stay organised</strong>
                <small>One list at a time</small>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className={styles.features}>
          <div className={styles.sectionHeading}>
            <span>WHY SHOPLIST?</span>
            <h2>Everything You Need to Shop Smarter</h2>
            <p>
              Simple tools to help you organise your shopping
              and save time.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📝</div>
              <h3>Create Shopping Lists</h3>
              <p>
                Create multiple shopping lists and organise
                them by category.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✅</div>
              <h3>Track Your Items</h3>
              <p>
                Mark items as completed and keep track of
                everything you need.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📦</div>
              <h3>Manage Quantities</h3>
              <p>
                Add, edit and remove items whenever your
                shopping needs change.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className={styles.howItWorks}>
          <div className={styles.sectionHeading}>
            <span>GET STARTED</span>
            <h2>Shopping Organised in 3 Easy Steps</h2>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <span>01</span>
              <h3>Create an Account</h3>
              <p>Sign up and access your personal shopping dashboard.</p>
            </div>

            <div className={styles.step}>
              <span>02</span>
              <h3>Create Your List</h3>
              <p>Add shopping lists and include all the items you need.</p>
            </div>

            <div className={styles.step}>
              <span>03</span>
              <h3>Start Shopping</h3>
              <p>Tick off items as you shop and stay organised.</p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className={styles.cta}>
          <h2>Ready to Make Shopping Easier?</h2>
          <p>
            Start organising your shopping today with ShopList.
          </p>
          <Link to="/signup" className={styles.ctaButton}>
            Create Your Free Account →
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <Link to="/" className={styles.logo}>
          <span>🛒</span>
          ShopList
        </Link>

        <p>© {new Date().getFullYear()} ShopList. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;