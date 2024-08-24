class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand px-4 py-3 border-bottom">
                <h1 class="text-primary">Admin List</h1>
                <form action="#" class="d-none d-sm-inline-block">

                </form>
                <div class="navbar-collapse collapse">
                    <ul class="navbar-nav ms-auto">
                        <div id="account-info" class="text-end me-3">
                            <div id="username">Dang Thuy Vy</div>
                            <div id="role" class="text-secondary">System Admin</div>
                        </div>
                        <li class="nav-item dropdown">
                            <a href="#" data-bs-toggle="dropdown" class="nav-icon pe-md-0">
                                <img src="../assets/account.png" class="avatar img-fluid" alt="">
                            </a>
                            <div class="dropdown-menu dropdown-menu-end rounded">
                                <ul id="my-account" class="navbar-item list-unstyled" data-bs-parent="">
                                    <li class="navbar-item">
                                        <a href="/my-account.html" class="navbar-link">
                                            <i class="lni lni-happy"></i>
                                            <span>My Account</span>
                                        </a>
                                    </li>
                                    <li class="navbar-item">
                                        <a href="/setting.html" class="navbar-link">
                                            <i class="lni lni-cog"></i>
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li class="navbar-item">
                                        <a href="#" class="navbar-link lgo-btn">
                                            <i class="lni lni-exit"></i>
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        `;
        this.attachEventHandlers();
    }

    attachEventHandlers() {
        const logoutButton = document.querySelector(".lgo-btn");
        function logout() {
            window.location.href = "../pages/admin-login.html";
        };

        logoutButton.addEventListener("click", function () {
            logout()
        });
    }
}

customElements.define("app-header", Header);