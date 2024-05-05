import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
export const authGuard: CanActivateFn = (route, state) => {

  // injection du service d'authentification
  const authService = inject(AuthService);
  // injection du router
  const router = inject(Router);
  
  //return authService.loggedIn;

  // C'est mieux d'utiliser une Promise car souvent
  // la fonction qui vérifie a besoin de faire une requête
  // à un serveur pour vérifier si l'utilisateur est bien
  // autorisé à accéder à la page. C'est ASYNCHRONE !
  // Donc la bonne pratique est d'implémenter isAdmin ou isLogged
  // comme une promesse qui renvoie un booléen.
  return authService.isLoggedIn().pipe(
    map((isLoggedIn:any)=> {
      if (isLoggedIn) {
        return true; // Laisse l'utilisateur accéder à la route protégée
      } else {
        router.navigate(['/login']); // Redirige vers la page de connexion si non authentifié
        return false;
      }
    })
  );

};
