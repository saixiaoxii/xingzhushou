package com.example.fuchuang.DTO;

import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class InterestDTO {

    @ApiModelProperty(value = "用户兴趣")
    private List<String> interest;

    @ApiModelProperty(value = "课程id")
    private String classId;

}
