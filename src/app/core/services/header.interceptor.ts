import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedHeaders = req.headers
    .set('authorId', '1');

  const authReq = req.clone({
    headers: modifiedHeaders
  });

  return next(authReq);
};

