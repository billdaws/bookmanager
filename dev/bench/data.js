window.BENCHMARK_DATA = {
  "lastUpdate": 1775703461679,
  "repoUrl": "https://github.com/billdaws/bookmanager",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "committer": {
            "email": "17349161+billdaws@users.noreply.github.com",
            "name": "Bill Daws",
            "username": "billdaws"
          },
          "distinct": true,
          "id": "f8fcb143be804d7345e2ffcec78aff67ef4dc070",
          "message": "ci(bench): track bench results over time",
          "timestamp": "2026-04-08T22:56:46-04:00",
          "tree_id": "26470aa30664214cdafe043cf72266f089145e9b",
          "url": "https://github.com/billdaws/bookmanager/commit/f8fcb143be804d7345e2ffcec78aff67ef4dc070"
        },
        "date": 1775703461383,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 225340,
            "unit": "ns/op\t   48025 B/op\t     825 allocs/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 225340,
            "unit": "ns/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 48025,
            "unit": "B/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 825,
            "unit": "allocs/op",
            "extra": "5758 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 1655259,
            "unit": "ns/op\t  412473 B/op\t    8028 allocs/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 1655259,
            "unit": "ns/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 412473,
            "unit": "B/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 8028,
            "unit": "allocs/op",
            "extra": "723 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 16811433,
            "unit": "ns/op\t 5900180 B/op\t   80036 allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 16811433,
            "unit": "ns/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900180,
            "unit": "B/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "73 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 3245641,
            "unit": "ns/op\t  142672 B/op\t    1261 allocs/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 3245641,
            "unit": "ns/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 142672,
            "unit": "B/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/100_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 1261,
            "unit": "allocs/op",
            "extra": "370 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 31522037,
            "unit": "ns/op\t  711862 B/op\t    5766 allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 31522037,
            "unit": "ns/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 711862,
            "unit": "B/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/1000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 5766,
            "unit": "allocs/op",
            "extra": "37 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 300451486,
            "unit": "ns/op\t 6840878 B/op\t   50997 allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 300451486,
            "unit": "ns/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 6840878,
            "unit": "B/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkCreateLibraryWithBooks/10000_books (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 50997,
            "unit": "allocs/op",
            "extra": "4 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db)",
            "value": 10804041,
            "unit": "ns/op\t 5900191 B/op\t   80036 allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - ns/op",
            "value": 10804041,
            "unit": "ns/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - B/op",
            "value": 5900191,
            "unit": "B/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkListBooks_Concurrent (github.com/billdaws/bookmanager/internal/storage/db) - allocs/op",
            "value": 80036,
            "unit": "allocs/op",
            "extra": "114 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web)",
            "value": 2.489,
            "unit": "ns/op\t       0 B/op\t       0 allocs/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 2.489,
            "unit": "ns/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 0,
            "unit": "B/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/empty (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 0,
            "unit": "allocs/op",
            "extra": "481106022 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web)",
            "value": 1938010,
            "unit": "ns/op\t 1194940 B/op\t   30006 allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1938010,
            "unit": "ns/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1194940,
            "unit": "B/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/bare_word (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 30006,
            "unit": "allocs/op",
            "extra": "604 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web)",
            "value": 1468180,
            "unit": "ns/op\t 1043050 B/op\t   20008 allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1468180,
            "unit": "ns/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1043050,
            "unit": "B/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_title (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20008,
            "unit": "allocs/op",
            "extra": "808 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web)",
            "value": 532034,
            "unit": "ns/op\t  803064 B/op\t       9 allocs/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 532034,
            "unit": "ns/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 803064,
            "unit": "B/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/field_filename (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 9,
            "unit": "allocs/op",
            "extra": "2101 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web)",
            "value": 1536308,
            "unit": "ns/op\t 1123064 B/op\t   20009 allocs/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 1536308,
            "unit": "ns/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 1123064,
            "unit": "B/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkApplyQuery/no_match (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 20009,
            "unit": "allocs/op",
            "extra": "745 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 5623976,
            "unit": "ns/op\t 5224357 B/op\t   31899 allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 5623976,
            "unit": "ns/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 5224357,
            "unit": "B/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/100_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 31899,
            "unit": "allocs/op",
            "extra": "216 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 47158287,
            "unit": "ns/op\t47387419 B/op\t  316308 allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 47158287,
            "unit": "ns/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 47387419,
            "unit": "B/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/1000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 316308,
            "unit": "allocs/op",
            "extra": "26 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web)",
            "value": 407662098,
            "unit": "ns/op\t577848709 B/op\t 3160407 allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 407662098,
            "unit": "ns/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577848709,
            "unit": "B/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibrary/10000_books (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160407,
            "unit": "allocs/op",
            "extra": "3 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web)",
            "value": 264344101,
            "unit": "ns/op\t577839494 B/op\t 3160387 allocs/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - ns/op",
            "value": 264344101,
            "unit": "ns/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - B/op",
            "value": 577839494,
            "unit": "B/op",
            "extra": "5 times\n2 procs"
          },
          {
            "name": "BenchmarkHandleLibraryConcurrent (github.com/billdaws/bookmanager/internal/web) - allocs/op",
            "value": 3160387,
            "unit": "allocs/op",
            "extra": "5 times\n2 procs"
          }
        ]
      }
    ]
  }
}