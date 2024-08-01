package com.example.fuchuang.controller;

import com.example.fuchuang.DTO.UserDTO;
import com.example.fuchuang.Pojo.Result;
import com.example.fuchuang.Pojo.User;
import com.example.fuchuang.Pojo.UserId;
import com.example.fuchuang.Utils.JWTUtils;
import com.example.fuchuang.service.impl.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Api(tags = "登录")
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    public UserServiceImpl userService;

    @ApiOperation("登录")
    @PostMapping
    public Result login(@RequestBody UserDTO userDTO){

        User user = userService.login(userDTO);

        if(user != null){

            if (userService.selectInterest(userDTO) == null) {

                Map<String, Object> claims = new HashMap<>();

                claims.put("id",user.getId());

                claims.put("password",user.getPassword());

                String jwt = JWTUtils.creatJWT(claims);

                return Result.success("未填写兴趣",jwt);

            } else {

                Map<String, Object> claims = new HashMap<>();

                claims.put("id",user.getId());

                claims.put("password",user.getPassword());

                String jwt = JWTUtils.creatJWT(claims);

                return Result.success("填写了兴趣",jwt);

            }

        }

        return Result.fail("登录失败");

    }

}
