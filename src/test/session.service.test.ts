import { beforeEach, describe, expect, it } from 'vitest';
import { clearSessionToken, getSessionToken, saveSessionToken } from '../services/session.service';
describe('Sesión', () => {
 beforeEach(() => sessionStorage.clear());
 it('devuelve null sin token', () => { expect(getSessionToken()).toBeNull(); });
 it('guarda, lee y elimina el token', () => {
   saveSessionToken('token-falso'); expect(getSessionToken()).toBe('token-falso');
   clearSessionToken(); expect(getSessionToken()).toBeNull();
 });
});
