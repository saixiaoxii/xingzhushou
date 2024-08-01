package com.example.fuchuang.service.impl;

import com.example.fuchuang.DTO.InterestDTO;
import com.example.fuchuang.DTO.UserDTO;
import com.example.fuchuang.Pojo.User;
import com.example.fuchuang.mapper.UserMapper;
import com.example.fuchuang.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户 服务实现类
 * </p>
 *
 * @author posty
 * @since 2024-03-08
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Autowired
    public UserMapper userMapper;

    @Override
    public User login(UserDTO userDTO) {

        return userMapper.login(userDTO);

    }

    @Override
    public void addInterest(String interest,String id) {

        userMapper.addInterest(interest,id);

    }

    @Override
    public String selectInterest(UserDTO userDTO) {

        return userMapper.selectInterest(userDTO.getId());

    }
}
