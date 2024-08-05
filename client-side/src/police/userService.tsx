const UserService = {
  get currentUser(): any {
    const name = localStorage.getItem("name");
    return name ? name : null;
  },

  get token(): any {
    const token = localStorage.getItem("token");
    return token ? token : null;
  },
};

export default UserService;
