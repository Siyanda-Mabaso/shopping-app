import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";

import type {
  RootState,
  AppDispatch,
} from "../../Store/store";

import { updateProfileThunk } from "../../ReduxSlice/ProfileSlice";

import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(
    (state: RootState) => state.login.user
  );

  const loading = useSelector(
    (state: RootState) => state.profile.loading
  );

  // Form values
  const [name, setName] = useState(
    currentUser?.name || ""
  );

  const [surname, setSurname] = useState(
    currentUser?.surname || ""
  );

  const [email, setEmail] = useState(
    currentUser?.email || ""
  );

  const [number, setNumber] = useState(
    currentUser?.number || ""
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!currentUser?.id) return;

    await dispatch(
      updateProfileThunk({
        ...currentUser,
        name,
        surname,
        email,
        number,
      })
    );
  };

  return (
    <div className={styles.profilePage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1>My Profile</h1>

          <p>
            View and update your personal information.
          </p>
        </div>

        <section className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileIcon}>
              👤
            </div>

            <div>
              <h2>Profile Information</h2>

              <p>
                Update your account details below.
              </p>
            </div>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.formRow}>
              <Input
                id="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <Input
                id="surname"
                label="Surname"
                type="text"
                placeholder="Enter your surname"
                value={surname}
                onChange={(e) =>
                  setSurname(e.target.value)
                }
              />
            </div>

            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <Input
              id="cellNumber"
              label="Cell Number"
              type="tel"
              placeholder="Enter your cell number"
              value={number}
              onChange={(e) =>
                setNumber(e.target.value)
              }
            />

            <div className={styles.actions}>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Profile;
