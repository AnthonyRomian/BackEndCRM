import React from 'react';

const HomePage = (props) => {
    return ( 
        <div className="jumbotron">
      <h1 className="display-3">CRM Lite</h1>
            <h2>Outil de gestion de statut de facture</h2>
          <h3>Back end</h3>
      <p className="lead">
        Pour compléter mes compétences sur le framework <strong>Symfony</strong> j'ai pu utiliser <strong>API Platform</strong>
      </p>
      <hr className="my-4" />
          <h3>Front end</h3>
      <p className="lead">
        Il à été réalisé avec le framework <strong>React</strong>, ce qui m'a permit de découvrir beaucoup de fonctionnalités
      </p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" target="_blank" href="https://github.com/AnthonyRomian/CRM-Lite-ApiPlatform-React" role="button">
          Voir le depot Git
        </a>
      </p>
    </div>
     );
}
 
export default HomePage;