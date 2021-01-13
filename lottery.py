from random import randint


def generate_numbers(n):
    choice_liset = []
    while len(choice_liset) < n:
        random_num = randint(1,45)
        if random_num not in choice_liset:
            choice_liset.append(random_num)
    return choice_liset


def draw_winning_numbers():
    winning_numbers = generate_numbers(7)
    return sorted(winning_numbers[:6]) + winning_numbers[6:]
    
def count_matching_numbers(numbers, winning_numbers):
    count = 0
    for num in numbers:
        if num in winning_numbers:
            count += 1
    return count

def check(numbers, winning_numbers):
    correct_num = count_matching_numbers(numbers, winning_numbers[:6])
    if correct_num == 6:
        return "1000000000"
    elif correct_num == 5 and winning_numbers[-1] in numbers:
        return "50000000"
    elif correct_num == 5:
        return "1000000"
    elif correct_num == 4:
        return "50000"
    elif correct_num == 3:
        return "5000"
    else:
        return "꽝"
