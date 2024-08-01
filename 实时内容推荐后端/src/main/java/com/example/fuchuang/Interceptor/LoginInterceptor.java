package com.example.fuchuang.Interceptor;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.UserId;
import com.example.fuchuang.Utils.JWTUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        return HandlerInterceptor.super.preHandle(request, response, handler);

        String jwt = request.getHeader("token");

        if (StringUtils.isEmpty(jwt)){

            Result error = Result.fail("登录失败");

            String notLogin = JSONObject.toJSONString(error);

            response.getWriter().write(notLogin);

            return false;

        }

        try {

            Claims claims = JWTUtils.parseJWT(jwt);

            String id = (String) claims.get("id");

            UserId.setUserId(id);

        } catch (Exception e) {

            e.printStackTrace();

            Result error = Result.fail("登录失败");

            //对象-->JSON
            String notLogin = JSONObject.toJSONString(error);

            response.getWriter().write(notLogin);

            return false;
        }

        return true;

    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//      HandlerInterceptor.super.afterCompletion(request, response, handler, ex);

        UserId.clear();

    }
}
