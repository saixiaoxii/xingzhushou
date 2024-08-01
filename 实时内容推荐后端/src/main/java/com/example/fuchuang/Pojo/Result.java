package com.example.fuchuang.Pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    private int code;
    private String message;
    private Object data;

//    public Result(Object data) {
//        this.code = 200;
//        this.message = "success";
//        this.data = data;
//    }
//
//    public Result(Object data, boolean success, String message) {
//        if (success) {
//            this.code = 200;
//            this.message = "success";
//        } else {
//            this.code = 500;
//            this.message = message;
//        }
//        this.data = data;
//    }

//    public Result(int code, String message) {
//        this.code = code;
//        this.message = message;
//        this.data = null;
//    }

    public static Result success() {
        return new Result(200, "success", null);
    }

    //    public static Result success(String message) { return new Result(1, message, null);}
    public static Result success(String message,Object data) { return new Result(200, message, data);}

    public static Result success(Object data) { return new Result(200, "success", data);}

    public static Result fail(String message) { return new Result(404, message, null);}



//    public static <T> Result<T> fail(int code, String message) {
//        return new Result<>(code, message);
//    }
}

