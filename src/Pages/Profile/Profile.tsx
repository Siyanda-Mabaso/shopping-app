import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profilePage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>My Profile</h1>
          <p>View and update your personal information.</p>
        </div>

        <section className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileIcon}>
              👤
            </div>

            <div>
              <h2>Profile Information</h2>
              <p>Update your account details below.</p>
            </div>
          </div>

          <form className={styles.form}>
            <div className={styles.formRow}>
              <Input
                id="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                
              />

              <Input
                id="surname"
                label="Surname"
                type="text"
                placeholder="Enter your surname"
              />
            </div>

            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <Input
              id="cellNumber"
              label="Cell Number"
              type="tel"
              placeholder="Enter your cell number"
            />

            <div className={styles.passwordSection}>
              <h3>Update Password</h3>

              <Input
                id="password"
                label="New Password"
                type="password"
                placeholder="Enter your new password"
              />
            </div>

            <div className={styles.actions}>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Profile;