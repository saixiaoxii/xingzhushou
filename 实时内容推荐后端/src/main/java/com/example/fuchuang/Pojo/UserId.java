package com.example.fuchuang.Pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UserId {

    private static final ThreadLocal<String> userId = new ThreadLocal<String>();

    public static String getUserId(){
        return userId.get();
    }

    public static void setUserId(String id){
        userId.set(id);
    }

    public static void clear(){
        userId.remove();
    }

}
