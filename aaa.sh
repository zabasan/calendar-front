#!/bin/sh

#b="kkkkkkk"
#
#c={"aaa":"$b"}
#
#echo $c
#
#aaa='aaaa'
#
#eval my_array=($b)
#
#echo my_array

n=1
eval arr[$n]=a
n=2
eval arr[$n]=b
n=3
eval arr[$n]=c

n=1
eval echo \${arr[$n]}
n=2
eval echo \${arr[$n]}
n=3
eval echo \${arr[$n]}
