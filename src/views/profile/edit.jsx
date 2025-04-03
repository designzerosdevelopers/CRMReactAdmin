import DeleteUserForm from './DeleteUserForm';
// import ControlPanelLayout from './layouts/ControlPanelLayout';
// import GuestLayout from './layouts/GuestLayout';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateProfileInformationForm from './UpdateProfileInformationForm';

const ProfilePage = ({ auth }) => {
  // Determine which layout to use based on authentication status and role.
  //   const Layout =
  //     auth?.check() && auth.user?.hasAnyRole('candidate')
  //       ? GuestLayout
  //       : ControlPanelLayout;

  return (
    // <Layout>
    <div className="container flex-grow-1 container-p-y">
      <div className="row">
        <div className="col-md-12 mt-4">
          <div className="card mb-4">
            <UpdateProfileInformationForm />
          </div>
          <div className="card mb-4">
            <UpdatePasswordForm />
          </div>
          <div className="card mb-4">
            <DeleteUserForm />
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default ProfilePage;
