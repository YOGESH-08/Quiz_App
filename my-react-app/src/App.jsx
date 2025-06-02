import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import "./App.css";

let randomQuizes;

function App() {
  const fetchAPI = async () => {
    const randomQuizes = await axios.get("http://localhost:8080/quize/random");
    console.log(randomQuizes);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Header />
      <div>
        <p className="Random">Available Quizes</p>
        <div>
          <div className="boxes">
            <div>Box 1</div>
            <div>Box 2</div>
          </div>
        </div>
        <div className="">
          <p className="Random">Try Random Quiz</p>
          <div>
            <div className="boxes">
              <div>Box 1</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer"><div className="container-fluid"> <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"> <div class="col-md-4 d-flex align-items-center"> <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" aria-label="Bootstrap"> <svg class="bi" width="30" height="24" aria-hidden="true"><use xlinkHref="#bootstrap"></use></svg> </a> <span class="mb-3 mb-md-0 text-body-secondary">© 2025 Quize, Inc</span> </div> <ul class="nav col-md-4 justify-content-end list-unstyled d-flex"> <li class="ms-3"><a class="text-body-secondary" href="#" aria-label="Instagram"><svg class="bi" width="24" height="24" aria-hidden="true"><use xlink:href="#instagram"></use></svg></a></li> <li class="ms-3"><a class="text-body-secondary" href="#" aria-label="Instagram"><svg class="bi" width="24" height="24" aria-hidden="true"><use xlink:href="#instagram"></use></svg></a><a class="text-body-secondary" href="#" aria-label="Facebook"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li> </ul> </footer> </div></div>
    </>
  );
}

export default App;
